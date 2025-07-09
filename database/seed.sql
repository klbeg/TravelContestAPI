CREATE TABLE player ( 
	player_id SERIAL PRIMARY KEY,
	player_name VARCHAR(18) NOT NULL,
	password VARCHAR(16) NOT NULL
);
CREATE TABLE contest ( 
	contest_id SERIAL PRIMARY KEY,
	contest_name VARCHAR(18) NOT NULL
);
CREATE TABLE trip (
  trip_id SERIAL PRIMARY KEY,
  player_id int REFERENCES player (player_id) ON UPDATE CASCADE ON DELETE CASCADE,
  trip_from VARCHAR(255),
  trip_to VARCHAR(255)
);

CREATE TABLE player_contest ( 
	player_id INT REFERENCES player (player_id) ON UPDATE CASCADE ON DELETE CASCADE,
	contest_id INT REFERENCES contest (contest_id) ON UPDATE CASCADE ON DELETE CASCADE
);
