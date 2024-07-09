import { MigrationInterface, QueryRunner } from 'typeorm';

export class tableUser1647339231280 implements MigrationInterface {
  name = 'tableUser1647339231280';

  public async up(queryRunner: QueryRunner): Promise<void> {
    let query = `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email character varying NOT NULL,
  password character varying NOT NULL,
  refresh_token character varying,
  role character varying,
  first_name character varying(255) NOT NULL,
  last_name character varying(255) NOT NULL,
  dob character varying(255),
  regCode character varying(255),
  reqCodeExpTime character varying(255),
  regLink character varying(255),
  regLinkExpTime character varying(255),
  isSignedUp character varying(255),
  resetPassLink character varying(255),
  resetPassLinkExpTime character varying(255),
  level character varying(255),
  gender character varying(255),
  phone character varying(255),
  deleted boolean DEFAULT  false,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
);

    CREATE TABLE personal_details (
                                    id SERIAL PRIMARY KEY,
                                    user_id INTEGER REFERENCES users(id),
                                    religion VARCHAR(100),
                                    caste VARCHAR(100),
                                    subcaste VARCHAR(100),
                                    height VARCHAR(20),
                                    weight INTEGER,
                                    complexion VARCHAR(50),
                                    marital_status VARCHAR(20),
                                    pob jsonb,
                                    por jsonb,
                                    nationality VARCHAR(20),
                                    deleted boolean DEFAULT false,
                                    created_at TIMESTAMP NOT NULL DEFAULT now(),
                                    updated_at TIMESTAMP NOT NULL DEFAULT now()
    );

    CREATE TABLE education (
                             id SERIAL PRIMARY KEY,
                             user_id INTEGER,
                             education_level VARCHAR(100),
                             college VARCHAR(255),
                             degree VARCHAR(100),
                             specialization VARCHAR(255),
                             graduation_year INTEGER,
                             deleted boolean DEFAULT false,
                             created_at TIMESTAMP NOT NULL DEFAULT now(),
                             updated_at TIMESTAMP NOT NULL DEFAULT now()
    );

CREATE TABLE offers (
  id SERIAL PRIMARY KEY,
  types character varying(255),
  user_id bigint NOT NULL,
  owner_id bigint,
  title character varying,
  description text,
  "from" DATE,
  "to" DATE,
  salary numeric,
  charge numeric,
  viewed integer DEFAULT 0,
  deleted boolean DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE marriage_requests (
  id SERIAL PRIMARY KEY,
  extra_info text,
  owner_id INT,
  status character varying(255),
  open_to_marriage BOOLEAN DEFAULT false,
  deleted boolean DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    question_type VARCHAR(20) NOT NULL,
    owner_id INT,
    deleted boolean DEFAULT false,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE choices (
    id SERIAL PRIMARY KEY,
    question_id INT,
    choice_text TEXT NOT NULL,
    deleted boolean DEFAULT false,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);


CREATE TABLE responses (
    id SERIAL PRIMARY KEY,
    question_id INT,
    user_id INT NOT NULL,
    response_text TEXT,
    deleted boolean DEFAULT false,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);


CREATE TABLE response_choices (
    id SERIAL PRIMARY KEY,
    response_id INT,
    choice_id INT,
    deleted boolean DEFAULT false,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

SELECT
      q.question_text,
      u.id AS user_name,
      STRING_AGG(c.choice_text, ', ') AS answer
    FROM
      questions q
        JOIN responses r ON q.id = r.question_id
        JOIN response_choices rc ON r.id = rc.response_id
        JOIN choices c ON rc.choice_id = c.id
        JOIN users u ON r.user_id = u.id
    WHERE
      q.question_type IN ('single_choice', 'multiple_choice')
      AND
      r.user_id = 1
    GROUP BY
      q.id, u.id, r.user_id

    UNION ALL


    SELECT
      q.question_text,
      u.id AS user_name,
      r.response_text AS answer
    FROM
      questions q
        JOIN responses r ON q.id = r.question_id
        JOIN users u ON r.user_id = u.id
    WHERE
      r.user_id = 1
      AND
      q.question_type = 'text';

    INSERT INTO questions (question_text, question_type, owner_id)
    VALUES ('What are your favorite fruits?', 'multiple_choice', 1);
    INSERT INTO questions (question_text, question_type, owner_id)
    VALUES ('What is your favorite color?', 'single_choice', 2);
    INSERT INTO questions (question_text, question_type, owner_id)
    VALUES ('Please describe your experience with our service.', 'text', 3);
    INSERT INTO questions (question_text, question_type, owner_id)
    VALUES ('Do you agree with the new company policy?', 'text', 4);
    INSERT INTO questions (question_text, question_type, owner_id)
    VALUES ('How would you rate our product on a scale of 1 to 5?', 'text', 5);
    INSERT INTO choices (question_id, choice_text) VALUES (1, 'Apple');
    INSERT INTO choices (question_id, choice_text) VALUES (1, 'Banana');
    INSERT INTO choices (question_id, choice_text) VALUES (1, 'Orange');
    INSERT INTO choices (question_id, choice_text) VALUES (1, 'Grapes');
    INSERT INTO choices (question_id, choice_text) VALUES (2, 'Red');
    INSERT INTO choices (question_id, choice_text) VALUES (2, 'Blue');
    INSERT INTO choices (question_id, choice_text) VALUES (2, 'Green');
    INSERT INTO choices (question_id, choice_text) VALUES (2, 'Yellow');
    INSERT INTO responses (question_id, user_id, response_text) VALUES (1, 1, NULL);
    INSERT INTO response_choices (response_id, choice_id) VALUES (1, 1); -- Apple
    INSERT INTO response_choices (response_id, choice_id) VALUES (1, 3); -- Orange
    INSERT INTO responses (question_id, user_id, response_text) VALUES (2, 2, NULL);
    INSERT INTO response_choices (response_id, choice_id) VALUES (2, 2); -- Blue
    INSERT INTO responses (question_id, user_id, response_text) VALUES (3, 3, 'The service was excellent and very prompt.');
    INSERT INTO responses (question_id, user_id, response_text) VALUES (4, 4, 'true');
    INSERT INTO responses (question_id, user_id, response_text) VALUES (5, 5, '4');
`;
    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
