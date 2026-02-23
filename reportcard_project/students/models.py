from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    marks = models.IntegerField()
    grade = models.CharField(max_length=20)
    status = models.CharField(max_length=10) # Pass or Fail

    def __str__(self):
        return self.name