from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Election Assistant API!"}

@app.get("/status")
def get_status():
    return {"status": "Backend is running successfully"}
