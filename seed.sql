-- Create the chatbots table
CREATE TABLE chat (
    id SERIAL PRIMARY KEY,
    clerk_user_id VARCHAR(255) NOT NULL,
    -- Clerk's user ID
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
-- Create the chatbot_characteristics table
CREATE TABLE chatbot_characteristics (
    id SERIAL PRIMARY KEY,
    chat_id INT REFERENCES chat(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
-- Create the guests table
CREATE TABLE guest (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
-- Create the chat_sessions table
CREATE TABLE chat_session (
    id SERIAL PRIMARY KEY,
    chat_id INT REFERENCES chat(id) ON DELETE CASCADE,
    guest_id INT REFERENCES guest(id) ON DELETE
    SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
-- Create the messages table
CREATE TABLE message (
    id SERIAL PRIMARY KEY,
    chat_session_id INT REFERENCES chat_session(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    sender VARCHAR(50) NOT NULL -- 'user' or 'ai'
);
-- Insert sample chatbot data
INSERT INTO chat (clerk_user_id, name, created_at)
VALUES ('clerk_user_1', 'Customer1', CURRENT_TIMESTAMP),
    ('clerk_user_2', 'Customer2', CURRENT_TIMESTAMP);
-- Insert sample chatbot characteristics data
INSERT INTO chatbot_characteristics (chat_id, content, created_at)
VALUES (
        1,
        'You are a helpful customer support assistant.',
        CURRENT_TIMESTAMP
    ),
    (
        1,
        'Our support hours are 9am-5pm, Monday to Friday.',
        CURRENT_TIMESTAMP
    ),
    (
        1,
        'You can track your order on our website.',
        CURRENT_TIMESTAMP
    ),
    (
        2,
        'You are a knowledgeable sales assistant.',
        CURRENT_TIMESTAMP
    ),
    (
        2,
        'We offer a 30-day money-back guarantee on all products.',
        CURRENT_TIMESTAMP
    ),
    (
        2,
        'Our products are available in various sizes and colors.',
        CURRENT_TIMESTAMP
    );
-- Insert sample guest data
INSERT INTO guest (name, email, created_at)
VALUES (
        'Guest One',
        'guest1@example.com',
        CURRENT_TIMESTAMP
    ),
    (
        'Guest Two',
        'guest2@example.com',
        CURRENT_TIMESTAMP
    );
-- Insert sample chat session data
INSERT INTO chat_session (chat_id, guest_id, created_at)
VALUES (1, 1, CURRENT_TIMESTAMP),
    (2, 2, CURRENT_TIMESTAMP);
-- Insert sample message data
INSERT INTO message (chat_session_id, content, created_at, sender)
VALUES (
        1,
        'Hello, I need help to classify something.',
        CURRENT_TIMESTAMP,
        'user'
    ),
    (
        1,
        'Sure, I can help with that. What seems to be the issue?',
        CURRENT_TIMESTAMP,
        'ai'
    ),
    (
        2,
        'Can you tell me more about HS Codes?',
        CURRENT_TIMESTAMP,
        'user'
    ),
    (
        2,
        'Of course! There is a variety of sections and chapters, do you want me to focus in any specific one?',
        CURRENT_TIMESTAMP,
        'ai'
    );