<?php
// Set the content type to JSON for the response
header('Content-Type: application/json');

// Connect to the SQLite database
try {
    $db = new PDO('sqlite:contact_form.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if the form is submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form data and sanitize it
        $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
        $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
        $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
        $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

        // Prepare the SQL statement
        $stmt = $db->prepare("INSERT INTO contact_form (name, email, phone, message) VALUES (:name, :email, :phone, :message)");

        // Bind parameters
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':message', $message);

        // Execute the statement
        if ($stmt->execute()) {
            // Respond with a success message
            echo json_encode(["success" => true, "message" => "Form submitted successfully."]);
        } else {
            // Respond with an error message
            echo json_encode(["success" => false, "message" => "Failed to submit the form."]);
        }
    }
} catch (PDOException $e) {
    // Handle connection errors
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}

// Close the database connection
$db = null;
?>
