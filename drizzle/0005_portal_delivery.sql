ALTER TABLE enquiries ADD COLUMN portal_state TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE enquiries ADD COLUMN portal_attempts INTEGER NOT NULL DEFAULT 0;
ALTER TABLE enquiries ADD COLUMN portal_next_attempt_at INTEGER NOT NULL DEFAULT 0;
ALTER TABLE enquiries ADD COLUMN portal_synced_at INTEGER;
CREATE INDEX enquiries_portal_delivery_idx ON enquiries(portal_state,portal_next_attempt_at);
