\echo '\n=== Tables in Database ===';
\dt;

\echo '\n=== All Shortened URLs ===';
SELECT 
    id,
    alias,
    original_url,
    public_url,
    clicks,
    to_char(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at
FROM urls 
ORDER BY created_at DESC; 