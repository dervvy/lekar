from django.db import models
from django.template.defaultfilters import slugify
from django.urls import reverse

class Category(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, db_index=True, unique=True)

    class Meta:
        ordering = ('name',)
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return f'/category/{self.slug}/'

def get_image_filename1(instance, filename):
    title = instance.name
    slug = slugify(title)
    unique_slug = slug
    return "photos/%s-%s" % (unique_slug, filename)


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products', verbose_name="Категория")
    name = models.CharField(max_length=200, db_index=True, verbose_name="Название")
    slug = models.SlugField(max_length=200, db_index=True)
    image = models.ImageField (upload_to=get_image_filename1, blank=True, verbose_name="Изображение")
    manufacturer = models.TextField(blank=True, verbose_name="Производитель")
    country = models.TextField(blank=True, verbose_name="Страна происхождения")
    release_form = models.TextField(blank=True, verbose_name="Форма выпуска")
    article = models.TextField(blank=True, verbose_name="Артикул")
    structure = models.TextField(blank=True, verbose_name="Состав")
    pharmacological_action = models.TextField(blank=True, verbose_name="Фармакологическое действие")
    indications = models.TextField(blank=True, verbose_name="Показания")
    contraindications = models.TextField(blank=True, verbose_name="Противопоказания")
    side_effects = models.TextField(blank=True, verbose_name="Побочные действия")
    reception = models.TextField(blank=True, verbose_name="Как принимать, курс приема и дозировка")
    overdose = models.TextField(blank=True, verbose_name="Передозировка")
    special_instructions = models.TextField(blank=True, verbose_name="Специальные указания")
    storage_conditions = models.TextField(blank=True, verbose_name="Условия хранения")
    expiration_date = models.TextField(blank=True, verbose_name="Срок годности")
    сonditions = models.TextField(blank=True, verbose_name="Условия отпуска из аптек")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Стоимость")
    available = models.BooleanField(default=True, verbose_name="В наличии на складе")
    created = models.DateTimeField(auto_now_add=True, verbose_name="Создание")
    updated = models.DateTimeField(auto_now=True, verbose_name="Обновление")

    class Meta:
        ordering = ('name',)
        verbose_name = 'Товары'
        verbose_name_plural = 'Товары'
        index_together = (('id', 'slug'),)

    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse('product', kwargs={'category_slug': self.category.slug, 'product_slug': self.slug})


class CallbackRequest(models.Model):
    TIME_CHOICES = [
        ('10-12', 'с 10:00 до 12:00'),
        ('12-14', 'с 12:00 до 14:00'),
        ('14-16', 'с 14:00 до 16:00'),
        ('16-18', 'с 16:00 до 18:00'),
    ]
    
    name = models.CharField(max_length=255, verbose_name='Имя')
    phone = models.CharField(max_length=20, verbose_name='Телефон')
    call_now = models.BooleanField(default=False, verbose_name='Позвонить сейчас')
    call_time = models.CharField(max_length=20, verbose_name='Время звонка', choices=TIME_CHOICES, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата запроса')


    class Meta:
        verbose_name = 'Заказ звонка'
        verbose_name_plural = 'Обратная связь'

    def __str__(self):
        return f"Запрос от {self.name}, тел: {self.phone}"

