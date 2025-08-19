# BINAYAK PANDIT

from fastapi import FastAPI
import uvicorn
from api.reconiti_api import api_router

app = FastAPI(title="Reconiti Platform")
app.include_router(api_router)

if __name__ == "__main__":
    uvicorn.run("run:app", host="0.0.0.0", port=8000, reload=True)
