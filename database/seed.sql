CREATE TABLE player ( 
	player_id SERIAL PRIMARY KEY,
	player_name VARCHAR(18) NOT NULL,
  email VARCHAR(100) NOT NULL,
	password VARCHAR(16) NOT NULL
);
CREATE TABLE contest ( 
	contest_id SERIAL PRIMARY KEY,
	contest_name VARCHAR(18) NOT NULL,
  admin_player_id INT REFERENCES player (player_id) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE trip (
  trip_id SERIAL PRIMARY KEY,
  player_id int REFERENCES player (player_id) ON UPDATE CASCADE ON DELETE CASCADE,
  home_location VARCHAR(255),
  destination VARCHAR(255),
  begin_date DATE,
  end_date DATE,
  trip_score NUMERIC
);

CREATE TABLE player_contest ( 
	player_id INT REFERENCES player (player_id) ON UPDATE CASCADE ON DELETE CASCADE,
	contest_id INT REFERENCES contest (contest_id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO player (player_name, email, password)
  VALUES ('kbot', 'kbot@email.com', 'pass123'),
    ('halz', 'halz@email.com', 'pass123'),
    ('elawds', 'elawds@email.com', 'pass123');

INSERT INTO contest (contest_name, admin_player_id)
  VALUES ('Bringing the Meets', (SELECT player_id FROM player WHERE player_name = 'kbot')),
    ('Beat Monsters', (SELECT player_id FROM player WHERE player_name = 'halz'));

INSERT INTO trip (player_id, home_location, destination, begin_date, end_date, trip_score)
  VALUES((SELECT player_id FROM player WHERE player_name = 'kbot'), 'philadelphia, pa', 'san diego, ca', to_date('2025-02-12', 'YYYY-MM-DD'), to_date('2025-03-01', 'YYYY-MM-DD'), 800),
  ((SELECT player_id FROM player WHERE player_name = 'kbot'), 'philadelphia, pa', 'saginaw, mi', to_date('2025-04-12', 'YYYY-MM-DD'), to_date('2025-05-01', 'YYYY-MM-DD'), 300),
  ((SELECT player_id FROM player WHERE player_name = 'halz'), 'new york, ny', 'boston, ma', to_date('2025-02-12', 'YYYY-MM-DD'), to_date('2025-03-01', 'YYYY-MM-DD'), 250),
  ((SELECT player_id FROM player WHERE player_name = 'halz'), 'new york, ny', 'denver, co', to_date('2028-03-12', 'YYYY-MM-DD'), to_date('2025-04-18', 'YYYY-MM-DD'), 400),
  ((SELECT player_id FROM player WHERE player_name = 'elawds'), 'philadelphia, pa', 'cleveland, oh', to_date('2025-02-01', 'YYYY-MM-DD'), to_date('20225-02-15', 'YYYY-MM-DD'), 150),
  ((SELECT player_id FROM player WHERE player_name = 'elawds'), 'philadelphia, pa', 'baltimore, md', to_date('2025-04-10', 'YYYY-MM-DD'), to_date('2025-05-01', 'YYYY-MM-DD'), 400);

INSERT INTO player_contest (player_id, contest_id)
  VALUES((SELECT player_id FROM player WHERE player_name = 'kbot'), (SELECT contest_id FROM contest WHERE contest_name = 'Beat Monsters')),
  ((SELECT player_id FROM player WHERE player_name = 'kbot'), (SELECT contest_id FROM contest WHERE contest_name = 'Bringing the Meets')),
  ((SELECT player_id FROM player WHERE player_name = 'halz'), (SELECT contest_id FROM contest WHERE contest_name = 'Bringing the Meets')),
  ((SELECT player_id FROM player WHERE player_name = 'halz'), (SELECT contest_id FROM contest WHERE contest_name = 'Beat Monsters')),
  ((SELECT player_id FROM player WHERE player_name = 'elawds'), (SELECT contest_id FROM contest WHERE contest_name = 'Bringing the Meets'));