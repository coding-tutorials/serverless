CREATE TABLE public.pictures (
    id uuid NOT NULL,
    "base64Picture" text NOT NULL,
    "createdAt" time with time zone NOT NULL
);

CREATE TABLE public.sessions (
    id uuid NOT NULL,
    ip character varying(15),
    "createdAt" timestamp with time zone NOT NULL
);

CREATE TABLE public.stamps (
    id uuid NOT NULL,
    "sessionId" uuid NOT NULL,
    "originalPicturesUrls" character varying[],
    "stampedPicturesIds" uuid[],
    "createdAt" timestamp with time zone NOT NULL
);

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT PK_sessions_id PRIMARY KEY (id);

ALTER TABLE ONLY public.pictures
    ADD CONSTRAINT PK_pictures_id PRIMARY KEY (id);

ALTER TABLE ONLY public.stamps
    ADD CONSTRAINT PK_stamps_id PRIMARY KEY (id);

CREATE INDEX IN_FK_stamps_sessions ON public.stamps USING btree ("sessionId");

CREATE INDEX IN_sessions_id ON public.sessions USING btree (id);

CREATE INDEX IN_pictures_id ON public.pictures USING btree (id);

CREATE INDEX IN_stamps_id ON public.stamps USING btree (id);

ALTER TABLE ONLY public.stamps
    ADD CONSTRAINT FK_stamps_sessions FOREIGN KEY ("sessionId") REFERENCES public.sessions(id);
