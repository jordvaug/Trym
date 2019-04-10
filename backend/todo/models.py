from django.db import models


class Todo(models.Model):
    """Todo models the task, and is related to the views """
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title