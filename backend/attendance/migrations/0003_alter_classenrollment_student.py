# Generated by Django 4.2.6 on 2024-12-05 12:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('attendance', '0002_classenrollment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classenrollment',
            name='student',
            field=models.ForeignKey(db_column='student_email', on_delete=django.db.models.deletion.CASCADE, to='attendance.student', to_field='email'),
        ),
    ]
