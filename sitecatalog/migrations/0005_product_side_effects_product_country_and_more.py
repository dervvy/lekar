# Generated by Django 4.2.8 on 2024-04-04 19:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sitecatalog', '0004_product_release_form'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='Side_effects',
            field=models.TextField(blank=True, verbose_name='Побочные действия'),
        ),
        migrations.AddField(
            model_name='product',
            name='country',
            field=models.TextField(blank=True, verbose_name='Страна происхождения'),
        ),
        migrations.AddField(
            model_name='product',
            name='indications',
            field=models.TextField(blank=True, verbose_name='Показания'),
        ),
        migrations.AddField(
            model_name='product',
            name='pharmacological_action',
            field=models.TextField(blank=True, verbose_name='Фармакологическое действие'),
        ),
    ]