# Define the API endpoint URL
$apiUrl = "http://localhost:8888/"

try {
    $response = Invoke-RestMethod -Uri $apiUrl -Method Get -ContentType "application/json"
    Write-Output $response
} catch {
    if ($_.Exception -eq $null) {
        Write-Output "Unknown error occurred."
    } else {
        $responseContent = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($responseContent)
        $errorResponse = $reader.ReadToEnd()
        Write-Output $errorResponse
    }
}