from django.shortcuts import render, get_object_or_404

from test11.forms import CallbackRequestForm
from .models import Category, Product
from django.core.paginator import Paginator
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.template.loader import render_to_string

def paginator_view(posts, request):
    paginator = Paginator(posts, settings.TOVARI_NUMBER_ON_PAGE)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return page_obj


def index(request):
    return render(request, 'index.html')


def about(request):
    return render(request, 'about.html')


def contact(request):
    return render(request, 'contact.html')

def catalog(request):
    categories = Category.objects.all()
    return render(request, 'catalog.html', context={"categories": categories})

def faq(request):
    return render(request, 'faq.html')


def howtoorder(request):
    return render(request, 'how-to-order.html')


def documents(request):
    return render(request, 'documents.html')


def transport(request):
    return render(request, 'tranpsort.html')


def keeping(request):
    return render(request, 'keeping.html')


def partners(request):
    return render(request, 'partners.html')


def privacypolicy(request):
    return render(request, 'privacypolicy.html')


def product(request, category_slug, product_slug):
    product = Product.objects.get(slug=product_slug)
    return render(request, 'product.html', context={"product": product})

def general_search(request):
    search_query = request.GET.get('search', '')
    products = Product.objects.all()
    if search_query:
        products = products.filter(name__iregex=search_query)
    page_obj = paginator_view(products, request)
    return render(request, 'search_result.html', {"products": page_obj, "search_query": search_query})

def quality(request):
    return render(request, 'quality.html')


def tovari(request, category_slug):
    category = get_object_or_404(Category, slug=category_slug)
    products = Product.objects.filter(category=category)
    search_query = request.GET.get('search', '')
    if search_query:
        products = products.filter(name__iregex=search_query)
    page_obj = paginator_view(products, request)
    return render(request, 'tovari.html', context={"category": category, "products": page_obj, "search_query": search_query})

def ajax_tovari(request, category_slug):
    category = get_object_or_404(Category, slug=category_slug)
    products = Product.objects.filter(category=category)
    search_query = request.GET.get('search', '')
    if search_query:
        products = products.filter(name__iregex=search_query)

    paginator = Paginator(products, settings.TOVARI_NUMBER_ON_PAGE)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    content = render_to_string('products_list.html', {'products': page_obj}, request=request)
    return JsonResponse({'content': content})

def callback_request(request):
    form = CallbackRequestForm(request.POST)
    if form.is_valid():
        callback_request = form.save(commit=False)
        print(form.cleaned_data)
        if form.cleaned_data['call_time']:
            callback_request.call_now = False
            callback_request.call_time = form.cleaned_data['call_time']
        callback_request.save()


    return render(request, 'index.html', {'form': form})