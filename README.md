# DataCollector

Aplikacia pre zber dat o prichodoch a obsluhe zakaznikov

Semestralna praca - predmet Modelovanie a Simulacia

Features:
	- vizualizacia frontu agentov (moznost zvolit si typ zobrazenia)
	- moznost zvolit si pocet services (front + obsluha)
	- tlacidlo na generovanie .csv files
	- reset aplikacie (statistik)
	- vymazanie db
	- zobrazovanie priebeznych statistik (o fronte len lokalne, ostatne tahat z databazy)
	- zobrazovanie dlzky merania (cas)


Project
    - priecinky zacinajuce _ su shared code, ostatne je feature specific code


TODO Dorobit login userov (auth.guard.ts a authentication.service.ts)
  - Ukladanie tokenu do db aj do localStorage funguje
  - Dorobit autentifikaciu s query do db ci existuje dany token
  - Dorobit logout - nastavenie tokenu v db (TTL = 0)

