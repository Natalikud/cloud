from pathlib import Path

import os
from dotenv import load_dotenv


load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY'),

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DEBUG'),

#разрешены любые хосты *
ALLOWED_HOSTS = ['*']

os.environ['URL_KEY'] = '9bDm1ttCwxFtmUaHKrUVULpcN6seSkosCOdu8YFM8wk='

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'app',
    'rest_framework',
    'corsheaders',
    'django_cleanup.apps.CleanupConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


CORS_ORIGIN_ALLOW_ALL = True

#для локальной настройки фронтенда
#закомментировать, если выкладываем репозиторий на облачный сервер
#CORS_ORIGIN_WHITELIST = (
#    'http://localhost:3000',
#    )

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
#через переменные окружения (из файла .env)
#на облачном сервере создала файд .env
#DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.postgresql',
#        'NAME': os.getenv('DB_NAME'),
#        'HOST': '127.0.0.1',
#        'PORT': '5432',
#        'USER': os.getenv('DB_USER'),
#        'PASSWORD': os.getenv('DB_PASSWORD'),
#    }
#}

#через переменные окружения
#прописан хост базы данных, созданной на облачном сервере
#остальные настройки подтянутся из файла .env на облачном сервере
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'cloud',
        'HOST': 'localhost',
        'PORT': '5432',
        'USER': 'cloud',
        'PASSWORD': 'cloud',
    }
}


#база данных локальной разработки (из файла .env_example)
#DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.postgresql',
#        'NAME': 'new_db2',
#        'HOST': '127.0.0.1',
#        'PORT': '5432',
#        'USER': 'postgres',
#        'PASSWORD': 'Natalikud',
#    }
#}

#база данных облачного сервера (из файла .env_example)
#DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.postgresql',
#        'NAME': 'new_db2',
#        'HOST': '127.0.0.1',
#        'PORT': '5432',
#        'USER': 'natalikud',
#        'PASSWORD': 'natalikud',
#    }
#}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
LANGUAGE_CODE = 'ru'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)

STATIC_ROOT = os.path.join(BASE_DIR, 'backend', 'static')
STATIC_URL = '/static/'


MEDIA_ROOT = os.path.join(BASE_DIR, 'backend', 'media')
MEDIA_URL = '/media/'

# Default primary key field type

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Loggs
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'one_for_all': {
            'format': '%(asctime)-3s %(name)-8s %(levelname)-8s %(message)s',
        },
    },
    'handlers': {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'one_for_all',
        },
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'formatter': 'one_for_all',
            'filename': 'logs.log',
        },
        'errors': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'formatter': 'one_for_all',
            'filename': 'errors.log',
        }
    },
    'loggers': {
        '': {
            'level': 'DEBUG',
            'handlers': ['console', 'file', 'errors'],
            'propagate': True,
        },
        'django.request': {
            'level': 'DEBUG',
            'handlers': ['console', 'file', 'errors'],
        },

        'django.db.backends': {
            'level': 'INFO',
            'handlers': ['file', 'errors'],
        }
    },
}


SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False
SECURE_SSL_REDIRECT = False
