# Generated by Django 4.2.8 on 2024-04-05 21:44

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("test11", "0007_callbackrequest"),
    ]

    operations = [
        migrations.AddField(
            model_name="callbackrequest",
            name="accept_policy",
            field=models.BooleanField(
                default=False, verbose_name="Согласие на обработку"
            ),
        ),
    ]
