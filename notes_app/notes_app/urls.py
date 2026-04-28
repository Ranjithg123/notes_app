from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from django.conf import settings
import os


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('notes.urls')),
    path('accounts/', include('accounts.urls')),
]

# Serve React frontend for all non-API routes (catch-all)
# This lets React Router handle client-side routing
if settings.REACT_BUILD_DIR.exists():
    urlpatterns += [
        path('', TemplateView.as_view(template_name='index.html'), name='home'),
        # Catch all other routes and let React Router handle them
        path('<path:path>', TemplateView.as_view(template_name='index.html'), name='catchall'),
    ]
