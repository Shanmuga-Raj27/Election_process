# Election Assistant Backend

This is the AI-powered backend for the Election Assistant application.

## Recent Structural Fixes

I have made a few important changes to make the project more stable and easier to test:

1.  **Fixed Missing `__init__.py` Files**: 
    Added these files to the `app/`, `backend/`, and `testing/` folders. This tells Python that these folders are part of a package, which fixes those "Cannot find module" errors you were seeing in your editor.

2.  **Added `import os` in `main.py`**:
    Fixed a crash where the application couldn't find the `os` module when trying to check environment variables.

3.  **Improved Database Startup (Lifespan)**:
    Instead of connecting to the database the moment the code is loaded, it now waits until the server actually starts. This is very important for testing because it prevents the tests from accidentally messing up your real data.

## How to Run Tests Properly

To avoid path errors, always run your tests from the **root folder** (the one containing the `app` folder) using this command:

```bash
python -m pytest app/testing/test_api.py
```

This ensures that all your imports (like `main` and `database`) work perfectly every time.

## Modernization & Library Updates (Fix 2)

I have updated the codebase to use the "modern vocabulary" required by the latest versions of **Pydantic (v2)** and **SQLAlchemy (v2)**. This removes the annoying warnings in your terminal and makes the app future-proof.

### Key Changes:
1.  **Pydantic V2 Updates**:
    *   Replaced `class Config` with `model_config`.
    *   Renamed `orm_mode` to `from_attributes`.
2.  **SQLAlchemy V2 Updates**:
    *   Moved `declarative_base` to the modern `sqlalchemy.orm` path.
3.  **Timezone Accuracy**:
    *   Replaced the old `utcnow()` with the modern `datetime.now(timezone.utc)`. This ensures the backend handles dates and times correctly across different parts of the world.

The code is now "Warning-Free" and follows the current industry best practices!

