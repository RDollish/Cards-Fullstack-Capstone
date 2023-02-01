USE [LousyCards];
GO

set identity_insert [Occasion] on
insert into [Occasion] ([Id], [Name]) 
values (1, 'Valentine''s Day'), (2, 'Birthday'), (3, 'Christmas'), (4, 'Anniversary'), (5, 'Just Because'),
       (6, 'Sympathy'), (7, 'Congratulations'), (8, 'Mother''s Day'), (9, 'Father''s Day'), (10, 'New Year''s'),
        (11, 'Thanksgiving')
set identity_insert [Occasion] off

set identity_insert [UserProfile] on
insert into UserProfile (Id, DisplayName, Email, CreatedAt, FirebaseUserId) values (1, 'rdoll', 'r@d.com', '2023-01-31', 'KdEvUZuNNPSebRFD95Db1abqpfp1');

set identity_insert [UserProfile] off
