# Generated by Django 3.2 on 2021-04-28 04:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_orderitem_shippingaddress'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='name',
        ),
    ]
