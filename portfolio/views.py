from django.shortcuts import render
from .forms import ContactForm
from django.core.mail import send_mail

def index(request):
    return render(request, 'base.html')

def testing_view(request):
    return render(request, 'pages/test.html')

def about_view(request):
    return render(request, 'pages/about.html')

def project_view(request):
    return render(request, 'pages/projects.html')

def contact_view(request):
    if request.method == 'POST':
        # validate and send the email
        form = ContactForm(request.POST)
        if form.is_valid():  # Corrected typo from "vaild" to "is_valid"
            print("valid data")
           
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']

            message_body = f"This is an email from your portfolio\nName:{name}\nEmail:{email}\nMessage:\n{message}"

            send_mail(
                "Email from Portfolio",
                message,
                email,
                ['amolina5252@gmail.com'] # who will receive the email
            )
            
            # Optionally add a success message
            from django.contrib import messages
            messages.success(request, "Your message has been sent successfully!")
            
            # Optionally redirect to avoid form resubmission
            # from django.shortcuts import redirect
            # return redirect('contact')
        else:
            print("invalid data")
    else:
        # display the page
        form = ContactForm()
    return render(request, 'pages/contact.html', {'form': form})