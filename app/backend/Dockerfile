# 🐳 NEA - AI Backend: Cloud-Native Container
# Optimized for Google Cloud Run & Render

# Stage 1: Build & Dependencies
FROM python:3.12-slim as builder

WORKDIR /app

# Install system dependencies for potential C-extensions
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Stage 2: Final Runtime Image
FROM python:3.12-slim

WORKDIR /app

# Copy installed packages from builder
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copy application source
COPY . .

# Set environment defaults to match Google Cloud Run exactly
ENV PORT=8080
ENV PYTHONUNBUFFERED=1

# Expose the Cloud Run port
EXPOSE 8080

# Launch using the official FastAPI CLI for production
CMD ["fastapi", "run", "main.py", "--host", "0.0.0.0", "--port", "8080"]