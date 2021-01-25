CREATE TABLE public."Translations"
(
    key character varying(100),
    lang character varying(5),
    content text
);

ALTER TABLE public."Translations"
    OWNER to postgres;