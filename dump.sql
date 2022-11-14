--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    name text NOT NULL,
    phone text NOT NULL,
    cpf character varying(11) NOT NULL,
    birthday date NOT NULL
);


--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: games; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.games (
    id integer NOT NULL,
    name text NOT NULL,
    image text NOT NULL,
    "stockTotal" integer NOT NULL,
    "categoryId" integer NOT NULL,
    "pricePerDay" integer NOT NULL
);


--
-- Name: games_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.games_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: games_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.games_id_seq OWNED BY public.games.id;


--
-- Name: rentals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rentals (
    id integer NOT NULL,
    "customerId" integer NOT NULL,
    "gameId" integer NOT NULL,
    "rentDate" date NOT NULL,
    "daysRented" integer NOT NULL,
    "returnDate" date,
    "originalPrice" integer NOT NULL,
    "delayFee" integer
);


--
-- Name: rentals_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.rentals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: rentals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.rentals_id_seq OWNED BY public.rentals.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: games id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games ALTER COLUMN id SET DEFAULT nextval('public.games_id_seq'::regclass);


--
-- Name: rentals id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rentals ALTER COLUMN id SET DEFAULT nextval('public.rentals_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.categories VALUES (9, 'Ação');
INSERT INTO public.categories VALUES (10, 'Guerra');
INSERT INTO public.categories VALUES (11, 'Investigação');
INSERT INTO public.categories VALUES (12, 'Humor');
INSERT INTO public.categories VALUES (13, 'nova');


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.customers VALUES (4, 'Dinho 2', '21998899222', '01234567892', '1999-09-21');
INSERT INTO public.customers VALUES (3, 'Dinho', '21998899222', '01234567897', '2005-02-01');
INSERT INTO public.customers VALUES (1, 'Dinho 5', '21998899222', '01234567894', '1999-09-21');
INSERT INTO public.customers VALUES (5, 'João Alfredo', '21998899222', '12312345688', '1992-10-05');
INSERT INTO public.customers VALUES (6, 'Claudio', '21999570191', '45612345677', '1999-09-21');
INSERT INTO public.customers VALUES (7, 'Testezinnn', '21998899222', '18202603722', '1992-10-05');
INSERT INTO public.customers VALUES (8, 'Cliente Teste', '21999570191', '18202603723', '1999-09-21');
INSERT INTO public.customers VALUES (9, 'João Alfredo', '21998899222', '01234567890', '1992-10-05');
INSERT INTO public.customers VALUES (2, 'João Alfredo', '21998899222', '01234567844', '1992-10-05');


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.games VALUES (2, 'Banco', 'imagem', 3, 9, 100);
INSERT INTO public.games VALUES (3, 'Banco Imobiliário', 'https://www.google.com/', 3, 9, 1500);
INSERT INTO public.games VALUES (4, 'Banco Imobiliário', 'https://www.google.com/', 3, 9, 1500);
INSERT INTO public.games VALUES (5, 'Banco', 'imagem', 3, 10, 100);
INSERT INTO public.games VALUES (6, 'Banco Imobiliáriooo', 'https://www.google.com/', 3, 9, 1500);
INSERT INTO public.games VALUES (7, 'Banco Imobiliárioooo', 'https://www.google.com/', 3, 10, 1500);
INSERT INTO public.games VALUES (8, 'novo jogo', 'https://www.google.com/', 3, 11, 150);
INSERT INTO public.games VALUES (9, 'joguinho', 'https://www.google.com/', 2, 10, 200);
INSERT INTO public.games VALUES (10, 'joguinho', 'https://www.google.com/', 2, 10, 200);
INSERT INTO public.games VALUES (11, 'joguinho', 'https://www.google.com/', 2, 10, 200);
INSERT INTO public.games VALUES (12, 'jogo teste', 'https://www.google.com/', 1, 11, 1000);
INSERT INTO public.games VALUES (13, 'new', 'https://www.google.com/', 3, 9, 1500);
INSERT INTO public.games VALUES (14, 'novinho', 'https://www.google.com/', 1, 10, 10);
INSERT INTO public.games VALUES (15, 'novato', 'https://www.google.com/', 10, 10, 10);


--
-- Data for Name: rentals; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.rentals VALUES (21, 3, 3, '2022-10-03', 1, NULL, 1500, NULL);
INSERT INTO public.rentals VALUES (23, 3, 3, '2022-10-03', 1, NULL, 1500, NULL);
INSERT INTO public.rentals VALUES (24, 3, 3, '2022-10-03', 1, NULL, 1500, NULL);
INSERT INTO public.rentals VALUES (31, 2, 2, '2022-10-03', 3, NULL, 300, NULL);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 13, true);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.customers_id_seq', 9, true);


--
-- Name: games_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.games_id_seq', 15, true);


--
-- Name: rentals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rentals_id_seq', 31, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- Name: rentals rentals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rentals
    ADD CONSTRAINT rentals_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

