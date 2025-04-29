<?php
// reviews.php - Backend for the review system

// Set headers for CORS and JSON content type
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

// Database connection (adjust these settings for your database)
$dbHost = 'localhost';
$dbName = 'smdb';
$dbUser = 'root';
$dbPass = ''; // Password is often empty in local development

try {
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
}

// Handle different HTTP methods
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get reviews for a movie
        getReviews();
        break;
    case 'POST':
        // Add a new review
        addReview();
        break;
    default:
        http_response_code(405); // Method Not Allowed
        echo json_encode(['error' => 'Method not allowed']);
}

// Function to get reviews for a specific movie
function getReviews() {
    global $pdo;
    
    // Get movie_id from query parameters
    $movieId = $_GET['movie_id'] ?? '';
    
    if (empty($movieId)) {
        http_response_code(400);
        echo json_encode(['error' => 'Movie ID is required']);
        return;
    }
    
    try {
        $stmt = $pdo->prepare("SELECT * FROM reviews WHERE movie_id = ? ORDER BY created_at DESC");
        $stmt->execute([$movieId]);
        $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($reviews);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}

// Function to add a new review
function addReview() {
    global $pdo;
    
    // Get JSON data from request body
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    if (!isset($data['movie_id']) || !isset($data['username']) || 
        !isset($data['rating']) || !isset($data['review'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        return;
    }
    
    // Extract data
    $movieId = $data['movie_id'];
    $username = $data['username'];
    $rating = floatval($data['rating']);
    $reviewText = $data['review'];
    
    // Validate rating
    if ($rating < 0.5 || $rating > 5 || ($rating * 2) % 1 !== 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid rating value']);
        return;
    }
    
    try {
        $stmt = $pdo->prepare("
            INSERT INTO reviews (movie_id, username, rating, review_text, created_at) 
            VALUES (?, ?, ?, ?, NOW())
        ");
        
        $stmt->execute([$movieId, $username, $rating, $reviewText]);
        
        // Get the newly inserted review with its ID
        $reviewId = $pdo->lastInsertId();
        $stmt = $pdo->prepare("SELECT * FROM reviews WHERE id = ?");
        $stmt->execute([$reviewId]);
        $newReview = $stmt->fetch(PDO::FETCH_ASSOC);
        
        http_response_code(201); // Created
        echo json_encode($newReview);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}
?>