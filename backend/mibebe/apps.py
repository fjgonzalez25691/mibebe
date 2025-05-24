from django.apps import AppConfig


class MibebeConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'mibebe'
    
    def ready(self):
        import mibebe.signals
