<?php
@ob_end_clean(); // Stop output buffering
header_remove(); // Remove previously set headers

if (!isset($_GET['path'])) {
    http_response_code(400);
    echo 'Missing file path';
    exit;
}

$path = $_GET['path'];
$path = str_replace('\\', '', $path); // Clean any backslashes
$path = ltrim($path, '/'); // Remove any leading slash

// Build GitHub raw URL
$github_url = 'https://raw.githubusercontent.com/GE-Union/CourseBank/main/' . $path;

// Get file extension and content type
$ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
$mime_types = [
    'pdf' => 'application/pdf',
    'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'zip' => 'application/zip',
    'ipynb' => 'application/x-ipynb+json',
    'txt' => 'text/plain',
];
$content_type = $mime_types[$ext] ?? 'application/octet-stream';

// Fetch file from GitHub using cURL
$ch = curl_init($github_url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36',
    CURLOPT_SSL_VERIFYPEER => true, // Can be set to false if local SSL issue
    CURLOPT_SSL_VERIFYHOST => 2,
]);

$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpcode !== 200 || $response === false) {
    curl_close($ch);
    http_response_code(404);
    echo 'Failed to fetch from: ' . $github_url;
    echo 'Path: ' . $_GET['path'];
    echo $response;
    exit;
}
curl_close($ch);



// Output file
header("Content-Type: $content_type");
header("Content-Length: " . strlen($response));
header("Accept-Ranges: bytes");
header("Cache-Control: public, must-revalidate, max-age=0");
header("Pragma: public");
header('Content-Disposition: inline; filename="' . basename(str_replace("_", " ", str_replace("-a-", " - ", $path))) . '"');
echo $response;
exit;