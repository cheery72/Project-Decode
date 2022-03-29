class Router:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'AnalysisServer':
            return 'AnalysisServer'
        return None