param([switch]$Refresh)
$ErrorActionPreference = 'Stop'
$sourceDirectory = Join-Path $PSScriptRoot '../listing-source/mls'
New-Item -ItemType Directory -Path $sourceDirectory -Force | Out-Null
$guid = 'f5a7a951-9e42-4c09-8604-f820559dd242'
$base = 'https://sckmls.paragonrels.com/ParagonLS/publink/view.mvc/'
$left = (Invoke-WebRequest -Uri ($base + 'LeftFrame?GUID=' + $guid + '&Report=Yes')).Content
$archivedIndex = [regex]::Replace($left, '(?is)<script\b[^>]*>.*?</script>', '')
[System.IO.File]::WriteAllText((Join-Path $sourceDirectory 'index.html'), $archivedIndex)
$ids = [regex]::Match($left, 'id="hdnAllListings" value="([^"]+)"').Groups[1].Value.Split(',')
if ($ids.Count -ne 62) { throw "Expected 62 listings; found $($ids.Count). Review source before importing." }
$listingIds = @()
foreach ($id in $ids) {
  $mls = $id.Split(':')[0]
  $listingIds += $mls
  $file = Join-Path $sourceDirectory ($mls + '.html')
  if ($Refresh -or -not (Test-Path -LiteralPath $file)) {
    $url = $base + 'Report?outputtype=HTML&GUID=' + $guid + '&ListingID=' + $id + '&Report=Yes&view=29&layout_id=51&screenWidth=1400'
    Invoke-WebRequest -Uri $url -OutFile $file
  }
  Write-Output ('Downloaded MLS ' + $mls)
  $galleryFile = Join-Path $sourceDirectory ($mls + '-gallery.html')
  if ($Refresh -or -not (Test-Path -LiteralPath $galleryFile)) {
    $galleryUrl = 'https://sckmls.paragonrels.com/ParagonLS/publink/Search.mvc/SlideShow2?GUID=' + $guid + '&listingId=' + $mls + '&index=0&callingWindow=fraDetail'
    Invoke-WebRequest -Uri $galleryUrl -OutFile $galleryFile
  }
}
[System.IO.File]::WriteAllText((Join-Path $sourceDirectory 'manifest.json'), (ConvertTo-Json @{ sourceUrl = ($base + '?GUID=' + $guid + '&Report=Yes'); retrievedAt = [DateTime]::UtcNow.ToString('o'); listingIds = $listingIds }))
Get-ChildItem -LiteralPath $sourceDirectory -Filter '*.html' -File | ForEach-Object {
  $markup = [System.IO.File]::ReadAllText($_.FullName)
  $markup = [regex]::Replace($markup, '(?m)[\t ]+\r?$', '')
  [System.IO.File]::WriteAllText($_.FullName, $markup.TrimEnd() + "`n")
}
