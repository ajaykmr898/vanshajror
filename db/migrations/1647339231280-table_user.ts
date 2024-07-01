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
  pob jsonb,
  por jsonb,
  level character varying(255),
  gender character varying(255),
  phone character varying(255),
  deleted boolean DEFAULT  false,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
);

CREATE TABLE offers (
  id SERIAL PRIMARY KEY,
  types character varying(255),
  user_id bigint NOT NULL REFERENCES users(id),
  owner_id bigint REFERENCES users(id),
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
  owner_id bigint NOT NULL,
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
`;
    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
