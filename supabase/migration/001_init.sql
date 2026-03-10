create table albums (
    id uuid primary key default gen_random_uuid(),
    spotify_id text unique not null,
    title text not null,
    artist text not null,
    cover_url text,
    week_date date not null,
    recommender text not null
);

create table tiers (
    id uuid primary key default gen_random_uuid(),
    member_name text not null,
    label text not null,    -- "S", "10", "Perfect", anything valid
    color text not null,    -- hex code
    rank integer not null,  -- order of tiers, top to bottom
    unique(member_name, rank)
);

create table tierlist_entries (
    id uuid primary key default gen_random_uuid(),
    tier_id uuid references tiers(id) not null,
    album_id uuid references albums(id) not null,
    position integer not null,   -- rank within tier
    member_name text not null,    -- denormalized for easier querying
    unique(tier_id, position)   -- no duplicate positions within a tier
);