-- Seed Data Brokers
INSERT INTO public.data_brokers (name, domain, category, difficulty, removal_method, removal_url, avg_removal_time_days, requires_verification)
VALUES
('Whitepages', 'whitepages.com', 'people_search', 'medium', 'form', 'https://www.whitepages.com/suppression_requests', 7, true),
('Spokeo', 'spokeo.com', 'people_search', 'medium', 'form', 'https://www.spokeo.com/optout', 5, true),
('BeenVerified', 'beenverified.com', 'people_search', 'medium', 'email', 'https://www.beenverified.com/app/optout/search', 7, true),
('Intelius', 'intelius.com', 'people_search', 'medium', 'form', 'https://www.intelius.com/optout', 7, true),
('Radaris', 'radaris.com', 'people_search', 'medium', 'form', 'https://radaris.com/control/privacy', 7, true),
('Instant Checkmate', 'instantcheckmate.com', 'background_check', 'hard', 'form', 'https://www.instantcheckmate.com/opt-out/', 14, true),
('TruthFinder', 'truthfinder.com', 'background_check', 'hard', 'form', 'https://www.truthfinder.com/opt-out/', 14, true),
('Acxiom', 'acxiom.com', 'marketing', 'hard', 'form', 'https://isapps.acxiom.com/optout/optout.aspx', 30, true),
('Epsilon', 'epsilon.com', 'marketing', 'hard', 'email', 'https://www.epsilon.com/us/consumer-privacy-rights', 30, true),
('Oracle Data Cloud', 'oracle.com', 'marketing', 'hard', 'form', 'https://datacloudoptout.oracle.com/', 30, false)
ON CONFLICT (name) DO UPDATE SET
  domain = EXCLUDED.domain,
  removal_url = EXCLUDED.removal_url;
