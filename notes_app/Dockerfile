FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Django project
COPY . .

# Create directory for SQLite database persistence
RUN mkdir -p /app/data

# Collect static files
RUN python manage.py collectstatic --noinput 2>/dev/null || true

# Expose port
EXPOSE 8000

# Run migrations and start Gunicorn
CMD ["sh", "-c", "python manage.py makemigrations accounts notes --noinput && python manage.py migrate --noinput && gunicorn notes_app.wsgi:application --bind 0.0.0.0:8000 --workers 3"]
