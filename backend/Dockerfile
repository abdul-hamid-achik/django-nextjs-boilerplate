# build stage
FROM python:3.11-alpine AS builder

# install PDM
RUN pip install -U pip setuptools wheel
RUN pip install pdm

# copy files
COPY . /backend

# install dependencies and project into the local packages directory
WORKDIR /backend

RUN mkdir __pypackages__ && pdm install --prod --no-lock --no-editable

# run stage
FROM python:3.11-alpine AS runner

ENV PYTHONPATH=/api/pkgs
ENV PATH=/api/bin:$PATH

RUN mkdir -p /api

# retrieve packages from build stage
COPY --from=builder /backend/__pypackages__/3.11/lib /api/pkgs
COPY --from=builder /backend/__pypackages__/3.11/bin /api/bin
COPY . /backend

WORKDIR /backend

# set entrypoint
ENTRYPOINT ["python", "-m", "gunicorn", "--bind", "0.0.0.0:8080", "api.wsgi:application"]
