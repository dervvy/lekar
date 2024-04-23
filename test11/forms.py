from django.forms import ModelForm
from test11.models import CallbackRequest

class CallbackRequestForm(ModelForm):
    class Meta:
        model = CallbackRequest
        fields = ['name', 'phone', 'call_now', 'call_time']
