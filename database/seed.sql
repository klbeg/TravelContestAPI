CREATE TABLE player ( 
	player_id SERIAL PRIMARY KEY,
	player_name VARCHAR(18) NOT NULL,
  email VARCHAR(100) NOT NULL,
	password VARCHAR(16) NOT NULL
);
CREATE TABLE contest ( 
	contest_id SERIAL PRIMARY KEY,
	contest_name VARCHAR(18) NOT NULL
);
CREATE TABLE trip (
  trip_id SERIAL PRIMARY KEY,
  player_id int REFERENCES player (player_id) ON UPDATE CASCADE ON DELETE CASCADE,
  start_location VARCHAR(255),
  destination VARCHAR(255),
  begin_date DATE,
  end_date DATE,
  trip_score NUMERIC
);

CREATE TABLE player_contest ( 
	player_id INT REFERENCES player (player_id) ON UPDATE CASCADE ON DELETE CASCADE,
	contest_id INT REFERENCES contest (contest_id) ON UPDATE CASCADE ON DELETE CASCADE
);
