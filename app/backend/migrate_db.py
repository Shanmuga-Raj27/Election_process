import sqlite3
import os

db_path = 'election_chatbot.db'
if os.path.exists(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    try:
        cursor.execute('ALTER TABLE chat_messages ADD COLUMN user_id TEXT')
        conn.commit()
        print("Success: user_id column added to chat_messages table.")
    except sqlite3.OperationalError as e:
        if "duplicate column name" in str(e).lower():
            print("Info: user_id column already exists.")
        else:
            print(f"Error: {e}")
    finally:
        conn.close()
else:
    print("Info: Database file not found. It will be created with the correct schema on next start.")
