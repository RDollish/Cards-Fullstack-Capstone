ALTER TABLE LousyCards.dbo.Card
EXEC sp_rename 'CardFavorites', 'Favorites';
EXEC sp_rename 'CardComments', 'Comments';
