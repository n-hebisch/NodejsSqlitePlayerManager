DROP TABLE match;
DROP TABLE player;
DROP TABLE team;
DROP TABLE tournament;
DROP TABLE t_team_match;
DROP TABLE t_team_player;
DROP TABLE t_team_tournament;
DROP TABLE t_match_tournament;

CREATE TABLE player
(
  id       INTEGER NOT NULL
    PRIMARY KEY AUTOINCREMENT,
  name     TEXT,
  active INTEGER(1)
);

CREATE TABLE team
(
  id       INTEGER NOT NULL
    PRIMARY KEY AUTOINCREMENT,
  name     TEXT,
  active INTEGER(1)
);

CREATE TABLE match
(
  id       INTEGER NOT NULL
    PRIMARY KEY AUTOINCREMENT,
  round     INT,
  active INTEGER(1)
);

CREATE TABLE tournament
(
  id       INTEGER NOT NULL
    PRIMARY KEY AUTOINCREMENT,
  name     TEXT,
  active INTEGER(1)
);

CREATE TABLE t_team_player
(
  teamId INTEGER NOT NULL  UNIQUE ,
  playerId INTEGER NOT NULL  UNIQUE,
  FOREIGN KEY (teamId) REFERENCES team(id),
  FOREIGN KEY (playerId) REFERENCES player(id)
);

CREATE TABLE t_team_match
(
  teamId INTEGER NOT NULL  UNIQUE ,
  matchId INTEGER NOT NULL  UNIQUE,
  FOREIGN KEY (teamId) REFERENCES team(id),
  FOREIGN KEY (matchId) REFERENCES match(id)
);

CREATE TABLE t_team_tournament
(
  teamId INTEGER NOT NULL  UNIQUE ,
  tournamentId INTEGER NOT NULL  UNIQUE,
  FOREIGN KEY (teamId) REFERENCES team(id),
  FOREIGN KEY (tournamentId) REFERENCES tournament(id)
);

CREATE TABLE t_match_tournament
(
  matchId INTEGER NOT NULL  UNIQUE ,
  tournamentId INTEGER NOT NULL  UNIQUE,
  FOREIGN KEY (matchId) REFERENCES match(id),
  FOREIGN KEY (tournamentId) REFERENCES tournament(id)
);

INSERT INTO player (name, active) VALUES ('Eddy',1);
INSERT INTO player (name, active) VALUES ('Enis',1);
INSERT INTO player (name, active) VALUES ('Ole',1);
INSERT INTO player (name, active) VALUES ('Niklas',1);

INSERT INTO team (name, active) VALUES ('Team1',1);
INSERT INTO team (name, active) VALUES ('Team2',1);

INSERT INTO match(round, active) VALUES (1,1);

INSERT INTO tournament(name, active) VALUES ('Tournament',1);