$workspacePath = Split-Path -Path $PSScriptRoot -Parent
$pdfFile = Get-ChildItem -Path $workspacePath -Filter "*.pdf" | Select-Object -First 1

if (-not $pdfFile) {
    Write-Host "Could not find any PDF file in the workspace at $workspacePath"
    exit
}

$pdfPath = $pdfFile.FullName
$docxPath = Join-Path -Path $workspacePath -ChildPath ($pdfFile.BaseName + ".docx")

Write-Host "Target PDF: $pdfPath"
Write-Host "Target DOCX: $docxPath"

Write-Host "Starting Word Application..."
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0

try {
    Write-Host "Opening PDF in Word (This will take a while for 273 pages, please wait)..."
    $doc = $word.Documents.Open($pdfPath, $false, $true, $false)
    
    Write-Host "Saving as DOCX..."
    $doc.SaveAs([ref]$docxPath, [ref]16)
    $doc.Close()
    Write-Host "Conversion completed successfully!"
}
catch {
    Write-Host "Error occurred during conversion: $_"
}
finally {
    $word.Quit()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
    Write-Host "Word application closed."
}
