# Makefile pour projet Symfony avec Docker

.PHONY: help build up down logs shell composer symfony

# Couleurs pour l'affichage
YELLOW=\033[0;33m
GREEN=\033[0;32m
RED=\033[0;31m
NC=\033[0m # No Color

## Affiche cette aide
help:
	@echo "$(YELLOW)Commandes disponibles :$(NC)"
	@echo "$(GREEN)make setup$(NC)     - Installation complète du projet"
	@echo "$(GREEN)make build$(NC)     - Construire les images Docker"
	@echo "$(GREEN)make up$(NC)        - Démarrer les conteneurs"
	@echo "$(GREEN)make down$(NC)      - Arrêter les conteneurs"
	@echo "$(GREEN)make logs$(NC)      - Voir les logs"
	@echo "$(GREEN)make shell$(NC)     - Accéder au conteneur PHP"
	@echo "$(GREEN)make composer$(NC)  - Installer les dépendances Composer"
	@echo "$(GREEN)make symfony$(NC)   - Créer un nouveau projet Symfony"
	@echo "$(GREEN)make migrate$(NC)   - Exécuter les migrations"
	@echo "$(GREEN)make fixtures$(NC)  - Charger les fixtures"
	@echo "$(GREEN)make test$(NC)      - Lancer les tests"
	@echo "$(GREEN)make clean$(NC)     - Nettoyer les conteneurs et volumes"

## Installation complète du projet
setup: build up symfony composer
	@echo "$(GREEN)✅ Projet Symfony avec Docker installé avec succès !$(NC)"
	@echo "$(YELLOW)🌐 Application disponible sur : http://localhost:8080$(NC)"
	@echo "$(YELLOW)🗄️  phpMyAdmin disponible sur : http://localhost:8081$(NC)"

## Construire les images Docker
build:
	@echo "$(YELLOW)🔨 Construction des images Docker...$(NC)"
	docker-compose build --no-cache

## Démarrer les conteneurs
up:
	@echo "$(YELLOW)🚀 Démarrage des conteneurs...$(NC)"
	docker-compose up -d

## Arrêter les conteneurs
down:
	@echo "$(YELLOW)🛑 Arrêt des conteneurs...$(NC)"
	docker-compose down

## Voir les logs
logs:
	docker-compose logs -f

## Accéder au conteneur PHP
shell:
	docker-compose exec php bash

## Installer les dépendances Composer
composer:
	@echo "$(YELLOW)📦 Installation des dépendances Composer...$(NC)"
	@echo "$(YELLOW)📝 Création du fichier .env...$(NC)"
	docker-compose exec php sh -c 'if [ ! -f .env ]; then \
		echo "APP_ENV=dev" > .env; \
		echo "DATABASE_URL=\"mysql://symfony:symfony@database:3306/symfony_db?serverVersion=8.0\"" >> .env; \
	fi'
	docker-compose exec php composer install

## Créer un nouveau projet Symfony
symfony:
	@echo "$(YELLOW)🎼 Création du projet Symfony...$(NC)"
	docker-compose exec --user root php symfony new temp --webapp --no-git
	docker-compose exec --user root php sh -c "mv temp/* . 2>/dev/null || true; mv temp/.[^.]* . 2>/dev/null || true; rm -rf temp; chown -R www-data:www-data /var/www/html"

## Exécuter les migrations
migrate:
	docker-compose exec php php bin/console doctrine:migrations:migrate --no-interaction

## Charger les fixtures
fixtures:
	docker-compose exec php php bin/console doctrine:fixtures:load --no-interaction

## Lancer les tests
test:
	docker-compose exec php php bin/phpunit

## Nettoyer les conteneurs et volumes
clean:
	@echo "$(RED)🧹 Nettoyage des conteneurs et volumes...$(NC)"
	docker-compose down -v
	docker system prune -f

## Reconstruire et redémarrer
restart: down build up

## Afficher le statut des conteneurs
status:
	docker-compose ps

## Voir les logs en temps réel
watch-logs:
	docker-compose logs -f --tail=100
