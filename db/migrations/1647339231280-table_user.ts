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
  CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
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
                                    nationality VARCHAR(20)
    );

    CREATE TABLE education (
                             id SERIAL PRIMARY KEY,
                             user_id INTEGER,
                             education_level VARCHAR(100),
                             college VARCHAR(255),
                             degree VARCHAR(100),
                             specialization VARCHAR(255),
                             graduation_year INTEGER
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
  name character varying(255) NOT NULL,
  address jsonb,
  dob DATE NOT NULL,
  job character varying(255) NOT NULL,
  study character varying(255) NOT NULL,
  gender character varying(255) NOT NULL,
  phone character varying(255),
  email character varying(255),
  extra_info text,
  owner_id INT,
  status character varying(255),
  deleted boolean DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    question_type VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE choices (
    id SERIAL PRIMARY KEY,
    question_id INT,
    choice_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);


CREATE TABLE responses (
    id SERIAL PRIMARY KEY,
    question_id INT,
    user_id INT NOT NULL,
    response_text TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);


CREATE TABLE response_choices (
    id SERIAL PRIMARY KEY,
    response_id INT,
    choice_id INT,
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
      r.user_id = 6
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
      r.user_id = 6
      AND
      q.question_type = 'text';
`;
    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
