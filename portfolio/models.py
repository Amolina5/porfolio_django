from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name



class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='static/images/')
    url = models.URLField(blank=True)
    skills = models.ManyToManyField(Skill)
    year = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.year}"
