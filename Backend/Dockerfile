FROM php:8.2-apache


# Atualiza e instala dependências necessárias
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y \
        libzip-dev zip unzip libonig-dev libxml2-dev \
        libpq-dev libcurl4-openssl-dev gnupg git \
        && docker-php-ext-install mysqli pdo pdo_mysql \
        && apt-get clean && rm -rf /var/lib/apt/lists/*

# Habilita reescrita do Apache 
RUN a2enmod rewrite

# Copia os arquivos da aplicação para o diretório do Apache
COPY ./src /var/www/html/

# Permissões 
RUN chown -R www-data:www-data /var/www/html

# Porta padrão do Apache 
EXPOSE 80
