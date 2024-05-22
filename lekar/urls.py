"""
URL configuration for lekar project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from sitecatalog import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index, name='index'),
    path('about', views.about, name='about'),
    path('contact', views.contact, name='contact'),
    path('catalog', views.catalog, name='catalog'),
    path('category/<slug:category_slug>/', views.tovari, name='tovari'),
    path('howtoorder', views.howtoorder, name='howtoorder'),
    path('documents', views.documents, name='documents'),
    path('faq', views.faq, name='faq'),
    path('general_search', views.general_search, name='general_search'),
    path('quality', views.quality, name='quality'),
    path('keeping', views.keeping, name='keeping'),
    path('transport', views.transport, name='transport'),
    path('category/<slug:category_slug>/<slug:product_slug>/', views.product, name='product'),
    path('partners', views.partners, name='partners'),
    path('privacypolicy', views.privacypolicy, name='privacypolicy'),
    path('callback_request/', views.callback_request, name='callback_request'),
    path('admin/', admin.site.urls),
    path('ajax/tovari/<slug:category_slug>/', views.ajax_tovari, name='ajax_tovari'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)