# Generated by Django 4.2.9 on 2024-01-16 02:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Listing",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("description", models.TextField(blank=True, null=True)),
                ("price", models.DecimalField(decimal_places=2, max_digits=10)),
                (
                    "listing_type",
                    models.CharField(
                        choices=[("R", "Rent"), ("S", "Sale")],
                        default="R",
                        max_length=1,
                    ),
                ),
            ],
        ),
    ]