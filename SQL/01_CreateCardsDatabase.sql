USE [master]

IF db_id('LousyCards') IS NULl
  CREATE DATABASE [LousyCards]
GO

USE [LousyCards]
GO


DROP TABLE IF EXISTS [Occasion];
DROP TABLE IF EXISTS [Comment];
DROP TABLE IF EXISTS [Card];
DROP TABLE IF EXISTS [CardFavorite];
DROP TABLE IF EXISTS [CardComment];
DROP TABLE IF EXISTS [UserProfile];
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [FirebaseUserId] nvarchar(28) UNIQUE NOT NULL,
  [DisplayName] nvarchar(50) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [CreatedAt] datetime NOT NULL
)
GO

CREATE TABLE [Occasion] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [Name] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [Card] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [OccasionId] int NOT NULL,
  [ImageUrl] nvarchar(255) NOT NULL,
  [Title] nvarchar(50) NOT NULL DEFAULT 'Untitled',
  [Description] nvarchar(180) NOT NULL DEFAULT 'No description provided.',
  [CreatedAt] datetime NOT NULL,
  [Objects] varchar NOT NULL
)
GO

CREATE TABLE [CardFavorite] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [CardId] int NOT NULL,
  [CreatedAt] datetime NOT NULL
)
GO

CREATE TABLE [CardComment] (
  [Id] int PRIMARY KEY NOT NULL IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [CardId] int NOT NULL,
  [Comment] nvarchar(180) NOT NULL,
  [CreatedAt] datetime NOT NULL
)
GO

ALTER TABLE [Card] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Card] ADD FOREIGN KEY ([OccasionId]) REFERENCES [Occasion] ([Id])
GO

ALTER TABLE [CardFavorite] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [CardFavorite] ADD FOREIGN KEY ([CardId]) REFERENCES [Card] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [CardComment] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [CardComment] ADD FOREIGN KEY ([CardId]) REFERENCES [Card] ([Id]) ON DELETE CASCADE
GO
