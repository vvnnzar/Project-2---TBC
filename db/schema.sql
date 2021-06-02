<<<<<<< HEAD
drop database if exists interviewer;

create database interviewer;

use interviewer;

create table users ( 
    id int unsigned primary key auto_increment,
    -- username column of 20 characters long
    username varchar(22) not null unique,
    -- hash of sha 256 is always 64 characters long, dont need to use varchar as its alwasy the same length -- saves mem
    password char(64) not null,
    first_name varchar(52) not null,
    last_name varchar(52) not null,
    email varchar(320) not null,
    is_tutor boolean not null
);

create table questions (
    id int unsigned primary key auto_increment,
    question_title varchar(52) not null,
    question_text text not null,
    user_id int unsigned not null,
    question_tag varchar(12) not null,
    foreign KEY (user_id) references users(id)
);

create table comments(
    id int unsigned primary key auto_increment,
    comment_text text not null,
    question_id int unsigned not null,
    user_id int unsigned not null,
    foreign key (question_id) references questions(id),
    foreign key (user_id) references users(id)
);

create table quiz_results(
    id int unsigned primary key auto_increment,
    times_taken int unsigned,
    last_score tinyint unsigned, -- only needs to go up to 100 -- tiny int is more than enough mem allocation
    user_id int unsigned not null,
    foreign key (user_id) references users(id)
);

create table reputations(
    id int unsigned primary key auto_increment,
    user_id int unsigned not null,
    html_reputation boolean not null,
    css_reputation boolean not null,
    js_reputation boolean not null,
    sql_reputation boolean not null,
    node_reputation boolean not null,
    react_reputation boolean not null,
    foreign key(user_id) references users(id)
);

create table tutors (
    id int unsigned primary key auto_increment,
    user_id int unsigned not null,
    is_frontend boolean not null,
    is_backend boolean not null,
    css boolean not null,
    html boolean not null,
    js boolean not null,
    sql_ boolean not null,
    node boolean not null,
    react boolean not null,
    foreign key (user_id) references users(id)
    
    
);
=======
DROP DATABASE IF EXISTS techReady_db;
CREATE DATABASE techReady_db;
>>>>>>> d402544e6770f01845301861ecc2cd9100aaf19d
